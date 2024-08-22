"use client";

export default function DashboardContent() {

    return (
        <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
            <button
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>Page </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Clicking this tile will trigger a page event.
                </p>
            </button>
            <button
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>Identify </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Clicking this tile will identify a user.
                </p>
            </button>
            <button
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
                <h2 className={`mb-3 text-2xl font-semibold`}>Track </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Clicking this tile will trigger a track event.
                </p>
            </button>
        </div>
    );
}