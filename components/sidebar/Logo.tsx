'use client'

import {useRouter} from "next/navigation";

export default function Logo({logoUrl}) {
    const router = useRouter();

    return (
        <div style={{cursor: 'pointer'}}>
            <img
                onClick={() => router.push('/')}
                src={logoUrl}
                style={{maxWidth: '200px', maxHeight: '200px'}}
            />
        </div>
    );
}
