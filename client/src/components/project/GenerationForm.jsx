import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';

const TEST_TYPES = ['unit', 'integration', 'e2e', 'api', 'edge_cases'];

const GenerationForm = ({ projectId, onGenerate, isGenerating }) => {
  const [goal, setGoal] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['unit']);
  const [instructions, setInstructions] = useState('');

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim() || !sourceCode.trim() || selectedTypes.length === 0) {
      toast.error('Goal, source code, and at least one test type are required.');
      return;
    }

    try {
      await onGenerate({
        projectId,
        goal,
        sourceCode,
        testTypes: selectedTypes,
        additionalInstructions: instructions,
      });
      // Optionally clear form on success:
      // setSourceCode(''); setGoal('');
    } catch (error) {
      // Error handled by parent
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', flexDirection: 'column', gap: '1.25rem',
      padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
      background: 'var(--color-surface)',
    }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '-0.5rem' }}>
        Generate Test Cases
      </h3>

      <Input
        label="Test Goal"
        placeholder="e.g., Write tests for user authentication login flow"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          Source Code
        </label>
        <textarea
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          placeholder="Paste the source code here..."
          required
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.85rem',
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            resize: 'vertical',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-text-muted)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          Test Types
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TEST_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              style={{
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 500,
                border: '1px solid',
                borderColor: selectedTypes.includes(type) ? 'var(--color-text)' : 'var(--color-border)',
                background: selectedTypes.includes(type) ? 'var(--color-text)' : 'var(--color-surface-raised)',
                color: selectedTypes.includes(type) ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Additional Instructions (Optional)"
        placeholder="e.g., Use Jest mocking, prefer functional style..."
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate AI Tests'}
        </Button>
      </div>
    </form>
  );
};

export default GenerationForm;
