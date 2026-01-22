import React, { useState, useRef } from 'react'
import './create-food.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const fileRef = useRef()

  const navigate = useNavigate()

  const handleFile = (e) => {
    const f = e.target.files[0]
    setFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !file) { setMessage('Please provide a name and a video.'); return }
    try {
      setSubmitting(true)
      const form = new FormData()
      form.append('name', name)
      form.append('description', description)
      form.append('video', file)

      const res = await axios.post('http://localhost:3000/api/food', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })



      setMessage('Food created successfully')
      setName('')
      setDescription('')
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      console.error(err)
      setMessage(err?.response?.data?.message || err.message || 'Create failed')
    } finally { setSubmitting(false) }
  }

  return (
    <main className="create-food-page">
      <div className="cf-card">
        <div className="cf-header">
          <div>
            <div className="cf-title">Create Food Item</div>
            <div className="cf-sub">Add a short video, name and description for your menu item.</div>
          </div>
        </div>

        <form className="cf-form" onSubmit={handleSubmit}>
          <div className="cf-row">
            <label className="cf-label">Food name</label>
            <input className="cf-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Veggie Burger" />
          </div>

          <div className="cf-row">
            <label className="cf-label">Short description</label>
            <textarea className="cf-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the dish..." />
          </div>

          <div className="cf-row two">
            <div>
              <label className="cf-label">Video (mp4, mov)</label>
              <div className="cf-file">
                <label className="cf-file-drop" htmlFor="video-upload">
                  <div className="cf-file-icon" aria-hidden>
                    {/* SVG upload icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="17" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                  </div>
                  <div>
                    <div className="cf-file-label">Click to upload video</div>
                    <div className="cf-file-name">{file ? file.name : 'MP4 or MOV, up to 50MB'}</div>
                  </div>
                </label>
                <input id="video-upload" ref={fileRef} className="cf-file-input" type="file" accept="video/*" onChange={handleFile} />
              </div>
            </div>
            <div className="cf-preview">
              {file ? (
                <video src={URL.createObjectURL(file)} controls muted />
              ) : (
                <div style={{color:'var(--color-text-secondary)', padding:8}}>Preview</div>
              )}
            </div>
          </div>

          <div className="cf-actions">
            <button type="button" className="btn-ghost" onClick={() => { setName(''); setDescription(''); setFile(null); if (fileRef.current) fileRef.current.value = '' }}>Reset</button>
            <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Creating...' : 'Create food'}</button>
          </div>

          {message && <div style={{marginTop:12, color: message.includes('success') ? 'var(--color-accent)' : 'var(--color-danger)'}}>{message}</div>}
        </form>
      </div>
    </main>
  )
}

export default CreateFood
