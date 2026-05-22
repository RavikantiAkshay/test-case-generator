import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowUpTray,
  HiOutlineLink,
  HiOutlineFolder,
  HiOutlineTrash,
  HiOutlineArrowPath,
} from 'react-icons/hi2';
import useProjectStore from '../store/projectStore';
import { uploadZipAPI, importGithubAPI } from '../api/repositoryApi';
import axiosClient from '../api/axiosClient';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import TechBadge from '../components/repo/TechBadge';
import FolderTree from '../components/repo/FolderTree';
import RouteList from '../components/repo/RouteList';
import ModelList from '../components/repo/ModelList';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'routes', label: 'Routes' },
  { key: 'models', label: 'Models' },
  { key: 'structure', label: 'Structure' },
];

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeProject, fetchProject, deleteProject, isLoading } = useProjectStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [githubUrl, setGithubUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [reanalyzing, setReanalyzing] = useState(false);

  useEffect(() => {
    fetchProject(id).catch(() => {
      toast.error('Project not found');
      navigate('/dashboard');
    });
  }, [id, fetchProject, navigate]);

  const handleZipUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.zip')) { toast.error('Only .zip files'); return; }
    setUploading(true);
    setUploadProgress(0);
    try {
      await uploadZipAPI(id, file, (p) => setUploadProgress(p));
      await fetchProject(id);
      toast.success('Repository uploaded & analyzed');
      setShowUploadModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); setUploadProgress(0); }
  };

  const handleGithubImport = async (e) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;
    setImporting(true);
    try {
      await importGithubAPI(id, githubUrl);
      await fetchProject(id);
      toast.success('Repository imported & analyzed');
      setShowGithubModal(false);
      setGithubUrl('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Import failed');
    } finally { setImporting(false); }
  };

  const handleReanalyze = async () => {
    setReanalyzing(true);
    try {
      await axiosClient.post(`/repositories/analyze/${id}`);
      await fetchProject(id);
      toast.success('Re-analysis complete');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed');
    } finally { setReanalyzing(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      navigate('/dashboard');
    } catch (err) { toast.error(err.message); }
  };

  if (isLoading && !activeProject) {
    return (
      <div className="animate-in" style={{ maxWidth: '800px' }}>
        <Skeleton width="30%" height="1.2rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="50%" height="0.85rem" style={{ marginBottom: '2rem' }} />
        <Skeleton width="100%" height="200px" />
      </div>
    );
  }

  if (!activeProject) return null;

  const hasRepo = activeProject.sourceType !== 'none' && activeProject.repositoryPath;
  const techs = activeProject.detectedTechnologies || [];
  const routes = activeProject.analysisResults?.routes || [];
  const models = activeProject.analysisResults?.models || [];
  const summary = activeProject.repositorySummary || {};

  return (
    <div className="animate-in">
      {/* Breadcrumb */}
      <Link to="/dashboard" style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem',
        transition: 'color var(--transition)',
      }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
      >
        <HiOutlineArrowLeft size={14} /> Projects
      </Link>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '1.5rem',
      }}>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '4px' }}>
            {activeProject.projectName}
          </h1>
          {activeProject.description && (
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              {activeProject.description}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {hasRepo && (
            <Button variant="secondary" size="sm" onClick={handleReanalyze} disabled={reanalyzing}>
              <HiOutlineArrowPath size={14} style={reanalyzing ? { animation: 'spin 1s linear infinite' } : {}} />
              {reanalyzing ? 'Analyzing…' : 'Re-analyze'}
            </Button>
          )}
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <HiOutlineTrash size={14} /> Delete
          </Button>
        </div>
      </div>

      {/* No repo — upload section */}
      {!hasRepo && (
        <div style={{
          padding: '2.5rem 2rem', textAlign: 'center',
          border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            No repository attached. Upload a ZIP or import from GitHub to start analysis.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={() => setShowUploadModal(true)}>
              <HiOutlineArrowUpTray size={15} /> Upload ZIP
            </Button>
            <Button variant="secondary" onClick={() => setShowGithubModal(true)}>
              <HiOutlineLink size={15} /> Import GitHub
            </Button>
          </div>
        </div>
      )}

      {/* Has repo — tabs + content */}
      {hasRepo && (
        <>
          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 0,
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1.5rem',
          }}>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.84rem',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.key ? '2px solid var(--color-accent)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color var(--transition)',
                  marginBottom: '-1px',
                }}
              >
                {tab.label}
                {tab.key === 'routes' && routes.length > 0 && (
                  <span style={{
                    marginLeft: '5px', fontSize: '0.72rem',
                    padding: '1px 6px', borderRadius: '999px',
                    background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)',
                  }}>
                    {routes.length}
                  </span>
                )}
                {tab.key === 'models' && models.length > 0 && (
                  <span style={{
                    marginLeft: '5px', fontSize: '0.72rem',
                    padding: '1px 6px', borderRadius: '999px',
                    background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)',
                  }}>
                    {models.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-in">
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Source info */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem',
                }}>
                  <HiOutlineFolder size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <span>
                    <strong>{activeProject.sourceType === 'github' ? 'GitHub' : 'ZIP upload'}</strong>
                    {' · '}{summary.totalFiles || 0} files · {summary.totalDirectories || 0} directories
                  </span>
                </div>

                {activeProject.repositoryUrl && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                    {activeProject.repositoryUrl}
                  </p>
                )}

                {/* Technologies */}
                {techs.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Detected Technologies
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {techs.map((t, i) => <TechBadge key={i} name={t.name} category={t.category} />)}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {summary.languages?.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Languages
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {summary.languages.map((lang, i) => (
                        <span key={i} style={{
                          padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 500,
                          background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)',
                        }}>{lang}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick stats */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem',
                }}>
                  {[
                    { label: 'Routes', value: routes.length },
                    { label: 'Models', value: models.length },
                    { label: 'Technologies', value: techs.length },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      padding: '0.75rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'routes' && <RouteList routes={routes} />}
            {activeTab === 'models' && <ModelList models={models} />}
            {activeTab === 'structure' && <FolderTree treeString={summary.folderStructure} />}
          </div>
        </>
      )}

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload repository">
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          Upload a .zip file (max 50 MB). Analysis will run automatically.
        </p>
        <label htmlFor="zip-upload" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '2rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)',
          cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.85rem', color: 'var(--color-text-secondary)',
          transition: 'border-color var(--transition)',
        }}
          onMouseEnter={(e) => { if (!uploading) e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          {uploading ? <span>Uploading… {uploadProgress}%</span> : (
            <><HiOutlineArrowUpTray size={20} style={{ marginBottom: '0.35rem', color: 'var(--color-text-muted)' }} /><span>Click to select a .zip file</span></>
          )}
          <input id="zip-upload" type="file" accept=".zip" onChange={handleZipUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </Modal>

      {/* GitHub Modal */}
      <Modal isOpen={showGithubModal} onClose={() => setShowGithubModal(false)} title="Import from GitHub">
        <form onSubmit={handleGithubImport}>
          <Input id="github-url" label="Repository URL" placeholder="https://github.com/user/repo"
            value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setShowGithubModal(false)}>Cancel</Button>
            <Button type="submit" disabled={importing}>{importing ? 'Importing…' : 'Import'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectPage;
