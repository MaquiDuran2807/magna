import React from 'react';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function InfoCard({ icon, title, description }: InfoCardProps) {
    return (
        <div className="info-card">
            <div className="info-card-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

export default InfoCard;
