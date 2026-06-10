import { useState } from 'react';
import { exportMarkdownAPI, exportJSONAPI, exportTextAPI } from '../../api/exportApi';
import { HiOutlineDocumentText, HiOutlineCodeBracket, HiOutlineClipboard } from 'react-icons/hi2';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const ExportBar = ({ projectId, generations }) => {
  const [exporting, setExporting] = useState('');

  const handleExport = async (format, fn) => {
    if (generations.length === 0) {
      toast.error('No generations to export');
      return;
    }
    setExporting(format);
    try {
      await fn(projectId);
      toast.success(`${format} exported`);
    } catch {
      toast.error(`Failed to export ${format}`);
    } finally {
      setExporting('');
    }
  };

  const handleCopy = () => {
    if (generations.length === 0) {
      toast.error('No generations to copy');
      return;
    }
    const text = generations.map((g) => g.generatedContent).join('\n\n// ---\n\n');
    navigator.clipboard.writeText(text).then(
      () => toast.success('Copied to clipboard'),
      () => toast.error('Copy failed')
    );
  };

  return (
    <div style={{
      display: 'flex', gap: '8px', flexWrap: 'wrap',
      padding: '12px 16px',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-subtle)',
      alignItems: 'center',
    }}>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, marginRight: '4px', color: 'var(--color-text-secondary)' }}>
        Export:
      </span>
      <Button variant="secondary" size="sm" disabled={exporting === 'Markdown'}
        onClick={() => handleExport('Markdown', exportMarkdownAPI)}>
        <HiOutlineDocumentText size={14} /> {exporting === 'Markdown' ? '…' : 'Markdown'}
      </Button>
      <Button variant="secondary" size="sm" disabled={exporting === 'JSON'}
        onClick={() => handleExport('JSON', exportJSONAPI)}>
        <HiOutlineCodeBracket size={14} /> {exporting === 'JSON' ? '…' : 'JSON'}
      </Button>
      <Button variant="secondary" size="sm" disabled={exporting === 'Text'}
        onClick={() => handleExport('Text', exportTextAPI)}>
        <HiOutlineDocumentText size={14} /> {exporting === 'Text' ? '…' : 'Text'}
      </Button>
      <Button variant="secondary" size="sm" onClick={handleCopy}>
        <HiOutlineClipboard size={14} /> Copy All
      </Button>
    </div>
  );
};

export default ExportBar;
