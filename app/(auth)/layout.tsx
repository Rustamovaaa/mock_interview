import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
}