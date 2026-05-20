import CrudManager from './CrudManager';

const fields = [
  { name: 'title', label: 'Certificate Title', full: true },
  { name: 'issuer', label: 'Issuer' },
  { name: 'issue_date', label: 'Issue Date', type: 'date' },
  { name: 'credential_id', label: 'Credential ID' },
  { name: 'verification_url', label: 'Verification URL', full: true },
  { name: 'certificate_file', label: 'Certificate File', type: 'file', full: true },
  { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
];

function CertificationsManagement() {
  return <CrudManager endpoint="certificates" title="Certifications Management" fields={fields} />;
}

export default CertificationsManagement;
