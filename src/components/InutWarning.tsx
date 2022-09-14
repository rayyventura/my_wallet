import React from 'react';

export default function InutWarning({ error, name }: any) {
  return (
    <small
      style={{
        color: '#fff5f5',
        fontWeight: 'bold',
        backgroundColor: '#00000021',
        borderRadius: '12px',
        padding: '5px',
      }}
      className="text-danger"
    >
      {error?.[`${name}`]?.message}
    </small>
  );
}
