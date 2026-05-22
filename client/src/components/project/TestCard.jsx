import { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github';
import {
  HiOutlineHandThumbUp,
  HiOutlineHandThumbDown,
  HiOutlineArrowPath,
  HiOutlinePencilSquare,
  HiOutlineCheck,
} from 'react-icons/hi2';
import Button from '../common/Button';
import toast from 'react-hot-toast';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);

const TestCard = ({ generation, onRegenerate, onUpdateFeedback, onUpdateContent, isRegenerating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(generation.generatedContent);
  const [regenInstructions, setRegenInstructions] = useState('');
  const [showRegenInput, setShowRegenInput] = useState(false);

  const handleFeedback = (type) => {
    onUpdateFeedback(generation._id, { feedback: type });
  };

  const handleSaveContent = async () => {
    try {
      await onUpdateContent(generation._id, editContent);
      setIsEditing(false);
      toast.success('Content updated');
    } catch (e) {
      toast.error('Failed to update content');
    }
  };

  const handleRegenerate = async () => {
    try {
      await onRegenerate(generation._id, regenInstructions);
      setShowRegenInput(false);
      setRegenInstructions('');
      toast.success('Regenerated successfully');
    } catch (e) {
      toast.error('Failed to regenerate');
    }
  };

  return (
    <div style={{
      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
      overflow: 'hidden', background: 'var(--color-surface)',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px', background: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>
            {generation.goal}
          </h4>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Types: {generation.testTypes.join(', ')} · Model: {generation.modelUsed}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditing ? (
            <Button variant="secondary" size="sm" onClick={handleSaveContent}>
              <HiOutlineCheck size={14} /> Save
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
              <HiOutlinePencilSquare size={14} /> Edit
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => setShowRegenInput(!showRegenInput)}>
            <HiOutlineArrowPath size={14} /> Regenerate
          </Button>
        </div>
      </div>

      {/* Regen Input */}
      {showRegenInput && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
          <input
            type="text"
            placeholder="Additional instructions for regeneration..."
            value={regenInstructions}
            onChange={(e) => setRegenInstructions(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px', fontSize: '0.85rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              marginBottom: '8px', background: 'var(--color-bg)', color: 'var(--color-text)',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button size="sm" variant="secondary" onClick={() => setShowRegenInput(false)}>Cancel</Button>
            <Button size="sm" onClick={handleRegenerate} disabled={isRegenerating}>
              {isRegenerating ? 'Generating...' : 'Confirm'}
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '0', position: 'relative' }}>
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{
              width: '100%', minHeight: '300px', padding: '16px',
              border: 'none', background: 'var(--color-bg)', color: 'var(--color-text)',
              fontSize: '0.85rem', fontFamily: "'SF Mono', 'Fira Code', monospace",
              resize: 'vertical', outline: 'none',
            }}
          />
        ) : (
          <SyntaxHighlighter
            language="javascript"
            style={github}
            customStyle={{ margin: 0, padding: '16px', fontSize: '0.85rem', background: 'transparent' }}
          >
            {generation.generatedContent}
          </SyntaxHighlighter>
        )}
      </div>

      {/* Footer / Feedback */}
      <div style={{
        padding: '8px 16px', borderTop: '1px solid var(--color-border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--color-bg-subtle)',
      }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Generated at {new Date(generation.createdAt).toLocaleTimeString()}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginRight: '4px' }}>Feedback:</span>
          <button
            onClick={() => handleFeedback('approved')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: generation.feedback === 'approved' ? 'var(--color-text)' : 'var(--color-text-muted)',
            }}
          >
            <HiOutlineHandThumbUp size={16} />
          </button>
          <button
            onClick={() => handleFeedback('rejected')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: generation.feedback === 'rejected' ? 'var(--color-text)' : 'var(--color-text-muted)',
            }}
          >
            <HiOutlineHandThumbDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
