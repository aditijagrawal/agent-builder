import React from 'react';

export default {
  title: 'Agent Builder/Patterns',
  parameters: {
    layout: 'centered',
  },
};

/* ─── Shared primitives ─── */

const token = {
  surface: '#ffffff',
  surfaceMuted: '#f5f5f5',
  border: '#e0e0e0',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#bdbdbd',
  iconBlue: '#1976D2',
};

const baseContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 32,
  border: `1px dashed ${token.border}`,
  borderRadius: 8,
  background: token.surfaceMuted,
  minWidth: 360,
  minHeight: 240,
  fontFamily: 'Inter, Roboto, sans-serif',
};

/* ─── Empty States ─── */

export const EmptyCanvas = {
  name: 'EmptyState — Canvas (no nodes)',
  render: () => (
    <div style={baseContainer}>
      <span className="material-symbols-outlined" style={{ fontSize: 48, color: token.textDisabled }}>
        account_tree
      </span>
      <span style={{ fontWeight: 600, fontSize: 16, color: token.textPrimary }}>
        Your canvas is empty
      </span>
      <span style={{ fontSize: 13, color: token.textSecondary, textAlign: 'center', maxWidth: 260 }}>
        Drag nodes from the left panel to start building your agent flow.
      </span>
    </div>
  ),
};

export const EmptyAgentsList = {
  name: 'EmptyState — Agents list',
  render: () => (
    <div style={baseContainer}>
      <span className="material-symbols-outlined" style={{ fontSize: 48, color: token.textDisabled }}>
        smart_toy
      </span>
      <span style={{ fontWeight: 600, fontSize: 16, color: token.textPrimary }}>
        No agents yet
      </span>
      <span style={{ fontSize: 13, color: token.textSecondary, textAlign: 'center', maxWidth: 260 }}>
        Create your first AI agent to start automating customer interactions.
      </span>
    </div>
  ),
};

export const EmptySearchResults = {
  name: 'EmptyState — Search results',
  render: () => (
    <div style={baseContainer}>
      <span className="material-symbols-outlined" style={{ fontSize: 48, color: token.textDisabled }}>
        search_off
      </span>
      <span style={{ fontWeight: 600, fontSize: 16, color: token.textPrimary }}>
        No results found
      </span>
      <span style={{ fontSize: 13, color: token.textSecondary, textAlign: 'center', maxWidth: 260 }}>
        Try adjusting your search or filter criteria.
      </span>
    </div>
  ),
};

/* ─── Loading States ─── */

const shimmer = {
  background: 'linear-gradient(90deg, #ebebeb 25%, #f5f5f5 50%, #ebebeb 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s infinite',
  borderRadius: 4,
};

export const LoadingNodeCard = {
  name: 'LoadingState — Node card skeleton',
  render: () => (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div
        style={{
          width: 400,
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ ...shimmer, width: 32, height: 32, borderRadius: '50%' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ ...shimmer, width: '40%', height: 12 }} />
            <div style={{ ...shimmer, width: '60%', height: 10 }} />
          </div>
        </div>
        <div style={{ ...shimmer, width: '100%', height: 10 }} />
        <div style={{ ...shimmer, width: '80%', height: 10 }} />
      </div>
    </>
  ),
};

export const LoadingRHSPanel = {
  name: 'LoadingState — RHS panel skeleton',
  render: () => (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div
        style={{
          width: 360,
          height: 600,
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          background: '#fff',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ ...shimmer, width: '50%', height: 16 }} />
        <div style={{ ...shimmer, width: '100%', height: 40, borderRadius: 6 }} />
        <div style={{ ...shimmer, width: '100%', height: 80, borderRadius: 6 }} />
        <div style={{ ...shimmer, width: '70%', height: 12 }} />
        <div style={{ ...shimmer, width: '100%', height: 40, borderRadius: 6 }} />
        <div style={{ ...shimmer, width: '100%', height: 40, borderRadius: 6 }} />
        <div style={{ marginTop: 'auto', ...shimmer, width: '30%', height: 36, borderRadius: 20 }} />
      </div>
    </>
  ),
};

/* ─── Error States ─── */

export const ErrorGeneric = {
  name: 'ErrorState — Generic',
  render: () => (
    <div style={{ ...baseContainer, borderColor: '#FFCDD2', background: '#FFF5F5' }}>
      <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#E53935' }}>
        error
      </span>
      <span style={{ fontWeight: 600, fontSize: 16, color: token.textPrimary }}>
        Something went wrong
      </span>
      <span style={{ fontSize: 13, color: token.textSecondary, textAlign: 'center', maxWidth: 260 }}>
        We couldn't load this content. Please try again or contact support.
      </span>
      <button
        style={{
          marginTop: 8,
          padding: '8px 20px',
          background: '#E53935',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Retry
      </button>
    </div>
  ),
};

export const ErrorPermission = {
  name: 'ErrorState — Permission denied',
  render: () => (
    <div style={{ ...baseContainer, borderColor: '#FFE0B2', background: '#FFFDE7' }}>
      <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#F57C00' }}>
        lock
      </span>
      <span style={{ fontWeight: 600, fontSize: 16, color: token.textPrimary }}>
        Access restricted
      </span>
      <span style={{ fontSize: 13, color: token.textSecondary, textAlign: 'center', maxWidth: 260 }}>
        You don't have permission to view this. Contact your admin to request access.
      </span>
    </div>
  ),
};
