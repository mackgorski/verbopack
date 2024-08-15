import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

// Clerk's webhook IPs
const ALLOWED_IPS = [
  '3.131.207.170',
  '3.131.54.54',
  '3.133.102.100',
  '3.139.105.4',
  '18.217.197.172',
  '52.14.205.9',
  '52.14.244.48',
  '52.15.183.144',
];

// Define Zod schemas for Clerk event data
const EmailAddressSchema = z.object({
  id: z.string(),
  email_address: z.string().email(),
});

const UserEventSchema = z.object({
  id: z.string(),
  email_addresses: z.array(EmailAddressSchema),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.number(),
  updated_at: z.number(),
  last_sign_in_at: z.number().nullable(),
  external_id: z.string().nullable(),
  username: z.string().nullable(),
  primary_email_address_id: z.string(),
  primary_phone_number_id: z.string().nullable(),
  primary_web3_wallet_id: z.string().nullable(),
  public_metadata: z.record(z.unknown()),
  private_metadata: z.record(z.unknown()),
  unsafe_metadata: z.record(z.unknown()),
});

const OrganizationEventSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo_url: z.string().nullable(),
  created_at: z.number(),
  updated_at: z.number(),
  members_count: z.number(),
  public_metadata: z.record(z.unknown()),
  private_metadata: z.record(z.unknown()),
});

const OrganizationMembershipEventSchema = z.object({
  organization: z.object({ id: z.string() }),
  public_metadata: z.record(z.unknown()),
  private_metadata: z.record(z.unknown()),
  role: z.string(),
  public_user_data: z.object({ user_id: z.string() }),
});

const DeleteEventSchema = z.object({
  id: z.string(),
});

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Verify IP address
  const clientIp = req.headers.get('x-forwarded-for') || req.ip;
  if (!ALLOWED_IPS.includes(clientIp || '')) {
    console.error(`Unauthorized IP address: ${clientIp}`);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Get the headers
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        await handleUserEvent(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeletion(DeleteEventSchema.parse(evt.data).id);
        break;
      case 'organization.created':
      case 'organization.updated':
        await handleOrganizationEvent(evt.data);
        break;
      case 'organization.deleted':
        await handleOrganizationDeletion(DeleteEventSchema.parse(evt.data).id);
        break;
      case 'organizationMembership.created':
      case 'organizationMembership.updated':
        await handleOrganizationMembershipEvent(evt.data);
        break;
      case 'organizationMembership.deleted':
        await handleOrganizationMembershipDeletion(evt.data);
        break;
      case 'session.created':
      case 'session.ended':
      case 'session.removed':
        await handleSessionEvent(evt.data, eventType);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    console.log(`Event ${eventType} processed successfully`);
    return new NextResponse('', { status: 200 });
  } catch (error) {
    console.error(`Error processing ${eventType}:`, error);
    return new NextResponse('Error occurred', { status: 500 });
  }
}

async function handleUserEvent(data: unknown) {
  const parsedData = UserEventSchema.parse(data);
  const {
    id,
    email_addresses,
    first_name,
    last_name,
    image_url,
    created_at,
    updated_at,
    last_sign_in_at,
    external_id,
    username,
    primary_email_address_id,
    primary_phone_number_id,
    primary_web3_wallet_id,
    public_metadata,
    private_metadata,
    unsafe_metadata,
  } = parsedData;

  const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);

  const userData: Prisma.UserUpsertArgs['create'] = {
    clerkId: id,
    email: primaryEmail?.email_address ?? '',
    firstName: first_name,
    lastName: last_name,
    imageUrl: image_url,
    primaryEmailId: primary_email_address_id,
    primaryPhoneId: primary_phone_number_id,
    primaryWeb3WalletId: primary_web3_wallet_id,
    lastSignInAt: last_sign_in_at ? new Date(last_sign_in_at) : null,
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
    externalId: external_id,
    username: username,
    publicMetadata: JSON.stringify(public_metadata),
    privateMetadata: JSON.stringify(private_metadata),
    unsafeMetadata: JSON.stringify(unsafe_metadata),
  };

  await prisma.user.upsert({
    where: { clerkId: id },
    update: userData,
    create: userData,
  });
}

async function handleUserDeletion(userId: string) {
  await prisma.user.delete({ where: { clerkId: userId } });
}

async function handleOrganizationEvent(data: unknown) {
  const parsedData = OrganizationEventSchema.parse(data);
  const {
    id,
    name,
    slug,
    logo_url,
    created_at,
    updated_at,
    public_metadata,
    private_metadata,
  } = parsedData;

  const orgData: Prisma.OrganizationUpsertArgs['create'] = {
    clerkId: id,
    name,
    slug,
    imageUrl: logo_url,
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
    publicMetadata: JSON.stringify(public_metadata),
    privateMetadata: JSON.stringify(private_metadata),
  };

  await prisma.organization.upsert({
    where: { clerkId: id },
    update: orgData,
    create: orgData,
  });
}

async function handleOrganizationDeletion(organizationId: string) {
  await prisma.organization.delete({ where: { clerkId: organizationId } });
}

async function handleOrganizationMembershipEvent(data: unknown) {
  const parsedData = OrganizationMembershipEventSchema.parse(data);
  const { organization, role, public_user_data } = parsedData;

  const userOrg: Prisma.UserOrganizationUpsertArgs['create'] = {
    role,
    user: {
      connect: { clerkId: public_user_data.user_id },
    },
    organization: {
      connect: { clerkId: organization.id },
    },
  };

  await prisma.userOrganization.upsert({
    where: {
      userId_organizationId: {
        userId: (await prisma.user.findUnique({ where: { clerkId: public_user_data.user_id } }))!.id,
        organizationId: (await prisma.organization.findUnique({ where: { clerkId: organization.id } }))!.id,
      },
    },
    update: userOrg,
    create: userOrg,
  });
}

async function handleOrganizationMembershipDeletion(data: { organization: { id: string }, public_user_data: { user_id: string } }) {
  const user = await prisma.user.findUnique({ where: { clerkId: data.public_user_data.user_id } });
  const organization = await prisma.organization.findUnique({ where: { clerkId: data.organization.id } });

  if (user && organization) {
    await prisma.userOrganization.delete({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: organization.id,
        },
      },
    });
  }
}

async function handleSessionEvent(data: { user_id: string, id: string }, eventType: string) {
  const user = await prisma.user.findUnique({ where: { clerkId: data.user_id } });

  if (user) {
    switch (eventType) {
      case 'session.created':
        await prisma.session.create({
          data: {
            clerkId: data.id,
            userId: user.id,
            startedAt: new Date(),
          },
        });
        break;
      case 'session.ended':
      case 'session.removed':
        await prisma.session.update({
          where: { clerkId: data.id },
          data: { endedAt: new Date() },
        });
        break;
    }
  }
}