# Event Types Documentation

This documentation provides a detailed description of various event types, including the structure and data fields associated with each event.

## 1. **email.created**

**Description:** Email created

### Fields:
- **data**: `object`
  - **body**: `string` - HTML body of the email
  - **body_plain**: `string` - Plain text body of the email
  - **delivered_by_clerk**: `boolean` - Whether email delivery is handled by Clerk or the app developer
  - **email_address_id**: `string` - ID of the email address of the recipient
  - **from_email_name**: `string` - Local email part this email is sent from
  - **id**: `string` - ID of the email message
  - **object**: `string` - Object type for the encapsulated email (`email`)
  - **slug**: `string` - Machine-friendly name of the email template used (e.g., verification_code, invitation)
  - **status**: `string` - Delivery status of the email
  - **subject**: `string` - Email subject
  - **to_email_address**: `string` - Email address of the recipient
  - **user_id**: `string` - User ID of the recipient

### Example:
```json
{
  "data": {
    "body": "...",
    "body_plain": "123456 is your OTP code for Acme...",
    "delivered_by_clerk": true,
    "email_address_id": "idn_abcd",
    "from_email_name": "notifications",
    "id": "ema_abcd",
    "object": "email",
    "slug": "verification_code",
    "status": "queued",
    "subject": "123456 is your verification code",
    "to_email_address": "johndoe@acme.com",
    "user_id": "user_abcd"
  },
  "object": "event",
  "type": "email.created"
}
```

## 2. **organization.created**

**Description:** New organization was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - Organization creation date timestamp
  - **created_by**: `string` - Creator user ID
  - **id**: `string` - Unique organization identifier
  - **image_url**: `string (uri)` - URL of the organization's logo
  - **logo_url**: `string (uri)` - (Deprecated) URL of the organization's logo; use `image_url` instead
  - **name**: `string` - Name of the organization
  - **object**: `string` - Object type (`organization`)

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "created_by": "user_abc123",
    "id": "org_abc123",
    "image_url": "https://example.com/logo.png",
    "logo_url": null,
    "name": "Acme Corporation"
  },
  "object": "event",
  "type": "organization.created"
}
```

## 3. **organization.deleted**

**Description:** Organization was deleted

### Fields:
- **data**: `object`
  - **id**: `string` - Unique organization identifier
  - **object**: `string` - Object type (`organization`)

### Example:
```json
{
  "data": {
    "id": "org_abc123",
    "object": "organization"
  },
  "object": "event",
  "type": "organization.deleted"
}
```

## 4. **user.created**

**Description:** New user was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - User creation date timestamp
  - **email_addresses**: `array` - List of email addresses associated with the user
  - **id**: `string` - Unique user identifier
  - **object**: `string` - Object type (`user`)
  - **public_metadata**: `object` - Public metadata attached to the user
  - **username**: `string` - Username of the user

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "email_addresses": ["johndoe@acme.com"],
    "id": "user_abc123",
    "object": "user",
    "public_metadata": {},
    "username": "johndoe"
  },
  "object": "event",
  "type": "user.created"
}
```

## 5. **user.updated**

**Description:** User data was updated

### Fields:
- **data**: `object`
  - **id**: `string` - Unique user identifier
  - **object**: `string` - Object type (`user`)
  - **updated_at**: `number` - Timestamp of when the user was updated

### Example:
```json
{
  "data": {
    "id": "user_abc123",
    "object": "user",
    "updated_at": 1234567890
  },
  "object": "event",
  "type": "user.updated"
}
```

## 6. **user.deleted**

**Description:** User was deleted

### Fields:
- **data**: `object`
  - **id**: `string` - Unique user identifier
  - **object**: `string` - Object type (`user`)

### Example:
```json
{
  "data": {
    "id": "user_abc123",
    "object": "user"
  },
  "object": "event",
  "type": "user.deleted"
}
```

## 7. **session.created**

**Description:** New session was created

### Fields:
- **data**: `object`
  - **id**: `string` - Unique session identifier
  - **object**: `string` - Object type (`session`)
  - **user_id**: `string` - ID of the user associated with this session

### Example:
```json
{
  "data": {
    "id": "sess_abc123",
    "object": "session",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "session.created"
}
```

## 8. **session.deleted**

**Description:** Session was deleted

### Fields:
- **data**: `object`
  - **id**: `string` - Unique session identifier
  - **object**: `string` - Object type (`session`)

### Example:
```json
{
  "data": {
    "id": "sess_abc123",
    "object": "session"
  },
  "object": "event",
  "type": "session.deleted"
}
```

## 9. **invitation.accepted**

**Description:** An invitation was accepted

### Fields:
- **data**: `object`
  - **created_at**: `number` - Invitation acceptance timestamp
  - **email_address_id**: `string` - ID of the email address of the recipient
  - **inviter_user_id**: `string` - User ID of the person who sent the invitation
  - **organization_id**: `string` - ID of the organization
  - **status**: `string` - Status of the invitation
  - **user_id**: `string` - ID of the user who accepted the invitation

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "email_address_id": "idn_abcd",
    "inviter_user_id": "user_inv123",
    "organization_id": "org_abc123",
    "status": "accepted",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "invitation.accepted"
}
```

## 10. **invitation.created**

**Description:** An invitation was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - Invitation creation timestamp
  - **email_address_id**: `string` - ID of the email address of the recipient
  - **inviter_user_id**: `string` - User ID of the person who sent the invitation
  - **organization_id**: `string` - ID of the organization
  - **status**: `string` - Status of the invitation
  - **user_id**: `string` - ID of the user who received the invitation

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "email_address_id": "idn_abcd",
    "inviter_user_id": "user_inv123",
    "organization_id": "org_abc123",
    "status": "pending",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "invitation.created"
}
```

## 11. **invitation.revoked**

**Description:** An invitation was revoked

### Fields:
- **data**: `object`
  - **created_at**

: `number` - Timestamp of when the invitation was revoked
  - **email_address_id**: `string` - ID of the email address of the recipient
  - **inviter_user_id**: `string` - User ID of the person who sent the invitation
  - **organization_id**: `string` - ID of the organization
  - **status**: `string` - Status of the invitation
  - **user_id**: `string` - ID of the user whose invitation was revoked

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "email_address_id": "idn_abcd",
    "inviter_user_id": "user_inv123",
    "organization_id": "org_abc123",
    "status": "revoked",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "invitation.revoked"
}
```

## 12. **otp.created**

**Description:** OTP was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - OTP creation timestamp
  - **email_address_id**: `string` - ID of the email address of the recipient
  - **object**: `string` - Object type (`otp`)
  - **otp_code**: `string` - OTP code generated for the user
  - **user_id**: `string` - User ID for whom the OTP was created

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "email_address_id": "idn_abcd",
    "object": "otp",
    "otp_code": "123456",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "otp.created"
}
```

## 13. **password.updated**

**Description:** User's password was updated

### Fields:
- **data**: `object`
  - **id**: `string` - User ID whose password was updated
  - **object**: `string` - Object type (`user`)
  - **updated_at**: `number` - Timestamp of when the password was updated

### Example:
```json
{
  "data": {
    "id": "user_abc123",
    "object": "user",
    "updated_at": 1234567890
  },
  "object": "event",
  "type": "password.updated"
}
```

## 14. **role.assigned**

**Description:** A role was assigned to a user

### Fields:
- **data**: `object`
  - **created_at**: `number` - Timestamp of when the role was assigned
  - **organization_id**: `string` - ID of the organization
  - **role**: `string` - Role assigned to the user
  - **user_id**: `string` - User ID of the user who was assigned the role

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "organization_id": "org_abc123",
    "role": "admin",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "role.assigned"
}
```

## 15. **role.removed**

**Description:** A role was removed from a user

### Fields:
- **data**: `object`
  - **created_at**: `number` - Timestamp of when the role was removed
  - **organization_id**: `string` - ID of the organization
  - **role**: `string` - Role removed from the user
  - **user_id**: `string` - User ID of the user who was removed from the role

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "organization_id": "org_abc123",
    "role": "admin",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "role.removed"
}
```

## 16. **sign_in.created**

**Description:** A sign-in attempt was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - Sign-in attempt creation timestamp
  - **id**: `string` - Unique identifier for the sign-in attempt
  - **object**: `string` - Object type (`sign_in`)
  - **status**: `string` - Status of the sign-in attempt
  - **user_id**: `string` - User ID associated with the sign-in attempt

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "signin_abc123",
    "object": "sign_in",
    "status": "succeeded",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "sign_in.created"
}
```

## 17. **sign_in.failed**

**Description:** A sign-in attempt failed

### Fields:
- **data**: `object`
  - **created_at**: `number` - Sign-in attempt creation timestamp
  - **id**: `string` - Unique identifier for the sign-in attempt
  - **object**: `string` - Object type (`sign_in`)
  - **reason**: `string` - Reason for the sign-in failure
  - **status**: `string` - Status of the sign-in attempt
  - **user_id**: `string` - User ID associated with the sign-in attempt

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "signin_abc123",
    "object": "sign_in",
    "reason": "Invalid credentials",
    "status": "failed",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "sign_in.failed"
}
```

## 18. **sign_up.created**

**Description:** A sign-up attempt was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - Sign-up attempt creation timestamp
  - **id**: `string` - Unique identifier for the sign-up attempt
  - **object**: `string` - Object type (`sign_up`)
  - **status**: `string` - Status of the sign-up attempt
  - **user_id**: `string` - User ID associated with the sign-up attempt

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "signup_abc123",
    "object": "sign_up",
    "status": "pending",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "sign_up.created"
}
```

## 19. **sign_up.failed**

**Description:** A sign-up attempt failed

### Fields:
- **data**: `object`
  - **created_at**: `number` - Sign-up attempt creation timestamp
  - **id**: `string` - Unique identifier for the sign-up attempt
  - **object**: `string` - Object type (`sign_up`)
  - **reason**: `string` - Reason for the sign-up failure
  - **status**: `string` - Status of the sign-up attempt
  - **user_id**: `string` - User ID associated with the sign-up attempt

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "signup_abc123",
    "object": "sign_up",
    "reason": "Email already in use",
    "status": "failed",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "sign_up.failed"
}
```

## 20. **sign_up.completed**

**Description:** A sign-up attempt was completed

### Fields:
- **data**: `object`
  - **created_at**: `number` - Sign-up completion timestamp
  - **id**: `string` - Unique identifier for the sign-up attempt
  - **object**: `string` - Object type (`sign_up`)
  - **status**: `string` - Status of the sign-up attempt
  - **user_id**: `string` - User ID associated with the sign-up attempt

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "signup_abc123",
    "object": "sign_up",
    "status": "completed",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "sign_up.completed"
}
```

## 21. **sms.created**

**Description:** SMS created

### Fields:
- **data**: `object`
  - **body**: `string` - Body of the SMS
  - **delivered_by_clerk**: `boolean` - Whether SMS delivery is handled by Clerk or the app developer
  - **id**: `string` - ID of the SMS message
  - **object**: `string` - Object type for the encapsulated SMS (`sms`)
  - **slug**: `string

` - Machine-friendly name of the SMS template used (e.g., verification_code)
  - **status**: `string` - Delivery status of the SMS
  - **to_phone_number**: `string` - Phone number of the recipient
  - **user_id**: `string` - User ID of the recipient

### Example:
```json
{
  "data": {
    "body": "123456 is your OTP code for Acme.",
    "delivered_by_clerk": true,
    "id": "sms_abcd",
    "object": "sms",
    "slug": "verification_code",
    "status": "queued",
    "to_phone_number": "+1234567890",
    "user_id": "user_abcd"
  },
  "object": "event",
  "type": "sms.created"
}
```

## 22. **token.revoked**

**Description:** A token was revoked

### Fields:
- **data**: `object`
  - **id**: `string` - Unique identifier for the token
  - **object**: `string` - Object type (`token`)
  - **revoked_at**: `number` - Timestamp of when the token was revoked
  - **token_type**: `string` - Type of the token (e.g., session_token)
  - **user_id**: `string` - User ID associated with the token

### Example:
```json
{
  "data": {
    "id": "token_abc123",
    "object": "token",
    "revoked_at": 1234567890,
    "token_type": "session_token",
    "user_id": "user_abc123"
  },
  "object": "event",
  "type": "token.revoked"
}
```

## 23. **webhook.created**

**Description:** A webhook was created

### Fields:
- **data**: `object`
  - **created_at**: `number` - Webhook creation timestamp
  - **id**: `string` - Unique identifier for the webhook
  - **object**: `string` - Object type (`webhook`)
  - **url**: `string` - URL associated with the webhook
  - **webhook_secret**: `string` - Secret key for securing the webhook

### Example:
```json
{
  "data": {
    "created_at": 1234567890,
    "id": "whk_abc123",
    "object": "webhook",
    "url": "https://example.com/webhook",
    "webhook_secret": "supersecret"
  },
  "object": "event",
  "type": "webhook.created"
}
```

## 24. **webhook.deleted**

**Description:** A webhook was deleted

### Fields:
- **data**: `object`
  - **id**: `string` - Unique identifier for the webhook
  - **object**: `string` - Object type (`webhook`)
  - **url**: `string` - URL associated with the webhook

### Example:
```json
{
  "data": {
    "id": "whk_abc123",
    "object": "webhook",
    "url": "https://example.com/webhook"
  },
  "object": "event",
  "type": "webhook.deleted"
}
```
