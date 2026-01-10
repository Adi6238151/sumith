'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { ProductTabsProps } from '@/types/products'

export default function ProductTabs({
  features = [],
  specifications = [],
  support = {},
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'specifications' | 'support'>('features')

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tab-button { padding: 16px 24px; font-size: 15px; font-weight: 600; color: #6b7280; border: none; background-color: transparent; cursor: pointer; transition: all 0.3s ease; position: relative; white-space: nowrap; }
        .tab-button:hover { color: #374151; }
        .tab-button.active { color: #1e40af; }
        .tab-button.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 3px; background-color: #1e40af; animation: slideInDown 0.3s ease; }
        .tab-nav { display: flex; border-bottom: 2px solid #e5e7eb; margin-bottom: 32px; gap: 0; }
        .tab-content { animation: fadeIn 0.4s ease; min-height: 300px; }
        .feature-item { display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: flex-start; padding-bottom: 32px; margin-bottom: 32px; border-bottom: 1px solid #e5e7eb; }
        .feature-item:last-child { border-bottom: none; }
        .feature-icon { width: 64px; height: 64px; min-width: 64px; border-radius: 10px; overflow: hidden; background-color: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; }
        .feature-title { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 8px 0; line-height: 1.4; }
        .feature-description { font-size: 15px; color: #6b7280; line-height: 1.7; margin: 0; }
        .spec-row { display: grid; grid-template-columns: 220px 1fr; gap: 32px; padding: 16px 0; border-bottom: 1px solid #e5e7eb; }
        .spec-row:last-child { border-bottom: none; }
        .spec-label { font-weight: 700; color: #111827; font-size: 15px; margin: 0; }
        .spec-value { color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0; }
        .download-link { display: inline-flex; align-items: center; gap: 12px; padding: 12px 16px; background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; color: #1e40af; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 12px; transition: all 0.3s ease; }
        .download-link:hover { background-color: #e5e7eb; border-color: #9ca3af; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        .download-label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; background-color: #f0f0f0; padding: 4px 8px; border-radius: 4px; margin-left: 8px; }
        .empty-state { padding: 48px 24px; text-align: center; color: #9ca3af; font-size: 15px; }
        .support-text { font-size: 15px; line-height: 1.8; color: #374151; margin-bottom: 32px; }
        .download-section-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #111827; margin: 0 0 20px 0; }
        @media (max-width: 768px) { .tab-button { padding: 12px 16px; font-size: 14px; } .feature-item { grid-template-columns: 1fr; gap: 12px; } .spec-row { grid-template-columns: 1fr; gap: 8px; } }
      `}</style>

      <div style={{ width: '100%' }}>
        {/* Tab Navigation */}
        <div className="tab-nav" style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '32px', gap: '0' }}>
          <button className={`tab-button ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')} style={{ padding: '16px 24px', fontSize: '15px', fontWeight: '600', color: activeTab === 'features' ? '#1e40af' : '#6b7280', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', whiteSpace: 'nowrap' }} onMouseEnter={(e) => { if (activeTab !== 'features') e.currentTarget.style.color = '#374151' }} onMouseLeave={(e) => { if (activeTab !== 'features') e.currentTarget.style.color = '#6b7280' }}>Features{activeTab === 'features' && <div style={{ position: 'absolute', bottom: '-2px', left: '0', right: '0', height: '3px', backgroundColor: '#1e40af', animation: 'slideInDown 0.3s ease' }} />}</button>
          <button className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`} onClick={() => setActiveTab('specifications')} style={{ padding: '16px 24px', fontSize: '15px', fontWeight: '600', color: activeTab === 'specifications' ? '#1e40af' : '#6b7280', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', whiteSpace: 'nowrap' }} onMouseEnter={(e) => { if (activeTab !== 'specifications') e.currentTarget.style.color = '#374151' }} onMouseLeave={(e) => { if (activeTab !== 'specifications') e.currentTarget.style.color = '#6b7280' }}>Specifications{activeTab === 'specifications' && <div style={{ position: 'absolute', bottom: '-2px', left: '0', right: '0', height: '3px', backgroundColor: '#1e40af', animation: 'slideInDown 0.3s ease' }} />}</button>
          <button className={`tab-button ${activeTab === 'support' ? 'active' : ''}`} onClick={() => setActiveTab('support')} style={{ padding: '16px 24px', fontSize: '15px', fontWeight: '600', color: activeTab === 'support' ? '#1e40af' : '#6b7280', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', whiteSpace: 'nowrap' }} onMouseEnter={(e) => { if (activeTab !== 'support') e.currentTarget.style.color = '#374151' }} onMouseLeave={(e) => { if (activeTab !== 'support') e.currentTarget.style.color = '#6b7280' }}>Support{activeTab === 'support' && <div style={{ position: 'absolute', bottom: '-2px', left: '0', right: '0', height: '3px', backgroundColor: '#1e40af', animation: 'slideInDown 0.3s ease' }} />}</button>
        </div>

        {/* Tab Content */}
        <div className="tab-content" style={{ animation: 'fadeIn 0.4s ease', minHeight: '300px' }}>
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div>
              {features && features.length > 0 ? (
                <div>
                  {features.map((feature, idx) => (
                    <div key={idx} className="feature-item" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'flex-start', paddingBottom: '32px', marginBottom: '32px', borderBottom: idx < features.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                      {feature.icon && (
                        <div className="feature-icon" style={{ width: '64px', height: '64px', minWidth: '64px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Image src={urlFor(feature.icon).width(64).height(64).url()} alt={feature.featureTitle} width={64} height={64} style={{ objectFit: 'contain', padding: '8px' }} />
                        </div>
                      )}
                      <div>
                        <h4 className="feature-title" style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0', lineHeight: '1.4' }}>{feature.featureTitle}</h4>
                        <p className="feature-description" style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.7', margin: '0' }}>{feature.featureDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>No features available</div>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div>
              {specifications && specifications.length > 0 ? (
                <div>
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="spec-row" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', padding: '16px 0', borderBottom: idx < specifications.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                      <span className="spec-label" style={{ fontWeight: '700', color: '#111827', fontSize: '15px', margin: '0' }}>{spec.label}</span>
                      <span className="spec-value" style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>No specifications available</div>
              )}
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div>
              {support?.supportText || (support?.downloadLinks && support.downloadLinks.length > 0) ? (
                <>
                  {support?.supportText && (
                    <div className="support-text" style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151', marginBottom: '32px' }}>
                      <PortableText value={support.supportText} />
                    </div>
                  )}
                  {support?.downloadLinks && support.downloadLinks.length > 0 && (
                    <div>
                      <h4 className="download-section-title" style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 20px 0', color: '#111827' }}>Resources & Downloads</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {support.downloadLinks.map((link, idx) => (
                          <a key={idx} href={link.linkUrl} target="_blank" rel="noopener noreferrer" className="download-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', color: '#1e40af', textDecoration: 'none', fontSize: '14px', fontWeight: '600', marginBottom: '12px', transition: 'all 0.3s ease', width: 'fit-content' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <span>{link.linkTitle}</span>
                            {link.fileType && <span className="download-label" style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', marginLeft: '8px' }}>{link.fileType}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state" style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>Support information coming soon</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
