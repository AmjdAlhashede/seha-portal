import React from 'react';

const Placeholder = ({ name }) => (
    <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>{name} Page</h2>
        <p>This component is yet to be extracted from the original bundle.</p>
    </div>
);

// Public Pages (Wait, I thought some were extracted?)
// Keep these for now if not explicitly extracted
export const Inquiry = () => <Placeholder name="Inquiry" />;
export const Slenquiry = () => <Placeholder name="Sick Leave Inquiry" />;
export const AmanatInquiry = () => <Placeholder name="Amanat Inquiry" />;
export const DrivingLicenseInquiry = () => <Placeholder name="Driving License Inquiry" />;
export const Premarriage = () => <Placeholder name="Premarriage Inquiry" />;
export const Covid19report = () => <Placeholder name="Covid-19 Report" />;
export const Healthcertificates = () => <Placeholder name="Health Certificates" />;
export const Vaccinecertificate = () => <Placeholder name="Vaccine Certificate" />;
export const MySample = () => <Placeholder name="My Sample" />;
// Note: Account, Entity, and Organization components have been fully extracted.
// See pages/Account/, pages/Dashboard/EntityManagement/, and pages/Dashboard/Organizations/.
