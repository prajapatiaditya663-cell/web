import React, { useState, useEffect } from 'react'
import '../../pages/food-partner/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [ error, setError ] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const url = id === 'profile' || !id
                    ? 'http://localhost:3000/api/food-partner/profile'
                    : `http://localhost:3000/api/food-partner/${id}`

                const response = await axios.get(url, { withCredentials: true })
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner?.foodItems || [])
                setError(null)
            } catch (err) {
                const msg = err?.response?.data?.message || err.message || 'Unknown error'
                setError({ message: msg, status: err?.response?.status })
            }
        }

        fetch()
    }, [ id ])
              
    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                {error && error.status === 401 && (
                    <div style={{marginBottom:12, padding:12, background:'#2b3440', borderRadius:6}}>
                        <div style={{color:'#ffd166'}}>You must be signed in as a food partner to view this profile. Please sign in or register.</div>
                    </div>
                )}

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.businessName}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.businessAddress}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile?.totalMeals}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.customersServed}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v._id} className="profile-grid-item">
                        {/* Placeholder tile; replace with <video> or <img> as needed */}


                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted ></video>


                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile