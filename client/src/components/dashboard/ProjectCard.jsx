import { HiOutlineFolder, HiOutlineEllipsisVertical, HiOutlineTrash } from 'react-icons/hi2';

const ProjectCard = ({ project, onClick, onDelete }) => {
  const statusLabels = {
    created: 'No repo',
    uploading: 'Uploading…',
    analyzing: 'Analyzing…',
    ready: 'Ready',
    error: 'Error',
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div
      onClick={onClick}
      style={{
        padding: '1.25rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        transition: 'border-color var(--transition), background var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.background = 'var(--color-bg-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HiOutlineFolder size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <span style={{
            fontSize: '0.9rem', fontWeight: 600, letterSpacing: '-0.01em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            maxWidth: '200px',
          }}>
            {project.projectName}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project._id);
          }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text-muted)', display: 'flex', padding: '2px',
            transition: 'color var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          title="Delete project"
        >
          <HiOutlineTrash size={14} />
        </button>
      </div>

      {/* Description */}
      {project.description && (
        <p style={{
          fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.45,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          {project.description}
        </p>
      )}

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.75rem', color: 'var(--color-text-muted)',
      }}>
        <span>{statusLabels[project.status] || project.status}</span>
        <span>{timeAgo(project.updatedAt)}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
