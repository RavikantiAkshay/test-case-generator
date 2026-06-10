import { HiOutlineBeaker } from 'react-icons/hi2';
import Button from '../common/Button';

const EmptyState = ({ onAction }) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '4rem 2rem',
      border: '1px dashed var(--color-border)',
      borderRadius: 'var(--radius-lg)',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        background: 'var(--color-bg-subtle)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
      }}>
        <HiOutlineBeaker size={22} style={{ color: 'var(--color-text-muted)' }} />
      </div>
      <p style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem' }}>
        No projects yet
      </p>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', marginBottom: '1rem', textAlign: 'center' }}>
        Create your first project to start generating test cases.
      </p>
      {onAction && (
        <Button onClick={onAction}>
          New project
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
