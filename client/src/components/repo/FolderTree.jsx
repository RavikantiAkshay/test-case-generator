import { useState } from 'react';
import { HiOutlineChevronRight, HiOutlineFolder, HiOutlineDocument } from 'react-icons/hi2';

const TreeNode = ({ node, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isDir = node.type === 'dir';

  return (
    <div>
      <div
        onClick={() => isDir && setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '3px 0',
          paddingLeft: `${depth * 16}px`,
          fontSize: '0.82rem',
          cursor: isDir ? 'pointer' : 'default',
          color: isDir ? 'var(--color-text)' : 'var(--color-text-secondary)',
          transition: 'background var(--transition)',
          borderRadius: 'var(--radius-sm)',
        }}
        onMouseEnter={(e) => { if (isDir) e.currentTarget.style.background = 'var(--color-bg-subtle)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        {isDir ? (
          <>
            <HiOutlineChevronRight
              size={12}
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                transition: 'transform var(--transition)',
                flexShrink: 0,
                color: 'var(--color-text-muted)',
              }}
            />
            <HiOutlineFolder size={14} style={{ flexShrink: 0, color: 'var(--color-text-muted)' }} />
          </>
        ) : (
          <>
            <span style={{ width: '12px', flexShrink: 0 }} />
            <HiOutlineDocument size={14} style={{ flexShrink: 0, color: 'var(--color-text-muted)' }} />
          </>
        )}
        <span style={{ fontWeight: isDir ? 500 : 400 }}>{node.name}</span>
      </div>
      {isDir && isOpen && node.children?.map((child, i) => (
        <TreeNode key={child.path || i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
};

const FolderTree = ({ treeString }) => {
  if (!treeString) {
    return (
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        No folder structure available.
      </p>
    );
  }

  return (
    <pre style={{
      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
      fontSize: '0.8rem',
      lineHeight: 1.65,
      color: 'var(--color-text-secondary)',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      margin: 0,
      padding: '1rem',
      background: 'var(--color-bg-subtle)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-border)',
      maxHeight: '400px',
      overflow: 'auto',
    }}>
      {treeString}
    </pre>
  );
};

export default FolderTree;
