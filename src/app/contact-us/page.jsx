'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Country, State } from 'country-state-city'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { client } from '@/sanity/lib/client'

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    country: 'IN',
    regionState: '',
    topic: '',
    personName: '',
    designation: '',
    companyName: '',
    email: '',
    telephone: '',
    message: '',
    agreePrivacy: false,
    agreeNewsletter: false,
  })

  const [messageLength, setMessageLength] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [topics, setTopics] = useState([])
  const [states, setStates] = useState([])
  const maxMessageLength = 3000

  const countries = Country.getAllCountries()

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await client.fetch(`*[_type == "contactTopic" && isActive == true] | order(order asc) { _id, title }`)
        setTopics(data || [])
      } catch (error) {
        console.error('Failed to fetch topics:', error)
      }
    }
    fetchTopics()
  }, [])

  useEffect(() => {
    if (formData.country) {
      const countryStates = State.getStatesOfCountry(formData.country)
      setStates(countryStates)
      setFormData((prev) => ({ ...prev, regionState: '' }))
    }
  }, [formData.country])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (name === 'message') {
      setMessageLength(value.length)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const selectedCountry = countries.find(c => c.isoCode === formData.country)
      const selectedState = states.find(s => s.isoCode === formData.regionState)

      const submissionData = {
        ...formData,
        country: selectedCountry?.name || formData.country,
        regionState: selectedState?.name || formData.regionState,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' })
        setFormData({
          country: 'IN',
          regionState: '',
          topic: '',
          personName: '',
          designation: '',
          companyName: '',
          email: '',
          telephone: '',
          message: '',
          agreePrivacy: false,
          agreeNewsletter: false,
        })
        setMessageLength(0)
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-header">
            <h1 className="contact-title">CONTACT US</h1>
            <p className="contact-subtitle">Please fill in all fields.</p>
          </div>

          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="country" className="form-label">Country</label>
              <div className="select-wrapper">
                <select id="country" name="country" value={formData.country} onChange={handleInputChange} className="form-select" required>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="regionState" className="form-label">Region/State</label>
              <div className="select-wrapper">
                <select id="regionState" name="regionState" value={formData.regionState} onChange={handleInputChange} className="form-select" required disabled={!states.length}>
                  <option value="">Select Region/State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="topic" className="form-label">Topic</label>
              <div className="select-wrapper">
                <select id="topic" name="topic" value={formData.topic} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select Topic</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic.title}>{topic.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="personName" className="form-label">Person Name</label>
              <input type="text" id="personName" name="personName" value={formData.personName} onChange={handleInputChange} className="form-input" required />
            </div>

            <div className="form-field">
              <label htmlFor="designation" className="form-label">Designation</label>
              <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleInputChange} className="form-input" required />
            </div>

            <div className="form-field">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} className="form-input" required />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
            </div>

            <div className="form-field">
              <label htmlFor="telephone" className="form-label">Telephone</label>
              <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} className="form-input" required />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="form-textarea" maxLength={maxMessageLength} rows={6} required />
              <div className="character-counter">{messageLength} / {maxMessageLength}</div>
            </div>

            <div className="form-checkbox-field">
              <input type="checkbox" id="agreePrivacy" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleInputChange} className="form-checkbox" required />
              <label htmlFor="agreePrivacy" className="form-checkbox-label">
                I agree to share my personal data in accordance with the <Link href="/privacy-policy" className="privacy-link">privacy policy</Link>.
              </label>
            </div>

            <div className="form-checkbox-field">
              <input type="checkbox" id="agreeNewsletter" name="agreeNewsletter" checked={formData.agreeNewsletter} onChange={handleInputChange} className="form-checkbox" />
              <label htmlFor="agreeNewsletter" className="form-checkbox-label">
                I wish to receive the latest news from Sumith Electronics about product changes and important events.
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
      <Footer />


      

      <style jsx>{`
        .contact-page-wrapper { min-height: 100vh; background-color: #ffffff; padding: 140px 24px 80px; }
        .contact-page-container { max-width: 608px; margin: 0 auto; }
        .contact-header { margin-bottom: 42px; }
        .contact-title { font-size: 32px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px 0; letter-spacing: 0.02em; }
        .contact-subtitle { font-size: 15px; color: #666666; margin: 0; line-height: 1.5; }
        
        .status-message { padding: 16px 20px; border-radius: 6px; margin-bottom: 24px; font-size: 15px; font-weight: 500; animation: slideDown 0.3s ease; }
        .status-message.success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .status-message.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        .contact-form { display: flex; flex-direction: column; gap: 20px; }
        .form-field { display: flex; flex-direction: column; gap: 0; position: relative; }
        .form-label { position: absolute; top: -9px; left: 12px; background-color: #ffffff; padding: 0 6px; font-size: 13px; font-weight: 500; color: #5a5a5a; z-index: 1; pointer-events: none; }
        .form-input, .form-select, .form-textarea { width: 100%; padding: 16px 18px; font-size: 15px; color: #1a1a1a; background-color: #ffffff; border: 1px solid #d1d1d1; border-radius: 6px; outline: none; transition: all 0.2s ease; font-family: inherit; }
        .form-input::placeholder, .form-textarea::placeholder { color: #999999; opacity: 0; }
        .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #0066cc; box-shadow: 0 0 0 1px #0066cc; }
        .select-wrapper { position: relative; }
        .form-select { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'%3e%3cpath fill='%23666' d='M1 1l6 6 6-6'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 16px center; background-size: 12px; padding-right: 42px; cursor: pointer; }
        .form-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }
        .character-counter { text-align: right; font-size: 13px; color: #999999; margin-top: 6px; }
        .form-checkbox-field { display: flex; align-items: flex-start; gap: 12px; margin-top: 8px; }
        .form-checkbox { width: 18px; height: 18px; min-width: 18px; border: 1px solid #d1d1d1; border-radius: 3px; cursor: pointer; margin-top: 2px; accent-color: #0066cc; }
        .form-checkbox:focus { outline: 2px solid #0066cc; outline-offset: 2px; }
        .form-checkbox-label { font-size: 14px; color: #4a4a4a; line-height: 1.6; cursor: pointer; user-select: none; }
        .privacy-link { color: #0066cc; text-decoration: none; transition: color 0.2s ease; }
        .privacy-link:hover { color: #0052a3; text-decoration: underline; }
        .submit-button { width: fit-content; padding: 14px 48px; font-size: 15px; font-weight: 700; color: #ffffff; background-color: #0066cc; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 16px; align-self: flex-start; }
        .submit-button:hover:not(:disabled) { background-color: #0052a3; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3); }
        .submit-button:active:not(:disabled) { transform: translateY(0); box-shadow: 0 2px 6px rgba(0, 102, 204, 0.3); }
        .submit-button:focus { outline: 2px solid #0066cc; outline-offset: 3px; }
        .submit-button:disabled { opacity: 0.6; cursor: not-allowed; }
        @media (max-width: 768px) {
          .contact-page-wrapper { padding: 120px 20px 60px; }
          .contact-title { font-size: 28px; }
          .submit-button { width: 100%; align-self: stretch; }
        }
        @media (max-width: 480px) {
          .contact-page-wrapper { padding: 100px 16px 50px; }
          .contact-title { font-size: 24px; }
        }
      `}</style>
    </>
  )
}
