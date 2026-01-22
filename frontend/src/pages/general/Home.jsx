import React, { useEffect, useRef, useState } from 'react'
import '../../styles/variables.css'
import '../../styles/home.css'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = () => {
	const [videos, setVideos] = useState([])
	const videoRefs = useRef([])

	const [liked, setLiked] = useState([])
	const [likesCount, setLikesCount] = useState([])
	const [saved, setSaved] = useState([])
	const [savesCount, setSavesCount] = useState([])
	const [commentsCount, setCommentsCount] = useState([])

	useEffect(() => {
		let mounted = true
		const load = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/food', { withCredentials: true })
				console.debug('GET /api/food response', res && res.data)
				if (!mounted || !res || !res.data) return
				let items = []
				if (Array.isArray(res.data)) items = res.data
				else if (Array.isArray(res.data.foodItems)) items = res.data.foodItems
				else if (res.data.foodItem) items = [res.data.foodItem]

				const mapped = items
					.map((it, idx) => ({
						_id: it._id || it.id || `item-${idx}`,
						video: it.video || it.videoUrl || it.url || '',
						description: it.description || it.desc || '',
						foodPartner: it.foodPartner || it.storeId || it.partnerId || '',
						store: it.storeName || it.store || 'Store',
					}))
					.filter((it) => it.video && it.foodPartner)

				setVideos(mapped)
			} catch (err) {
				console.debug('Could not load backend videos', err?.message || err)
			}
		}

		load()

		return () => {
			mounted = false
		}
	}, [])

	useEffect(() => {
		const options = { root: null, threshold: 0.6 }
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const videoEl = entry.target.querySelector('video')
				if (!videoEl) return
				if (entry.isIntersecting) {
					videoEl.play().catch(() => {})
				} else {
					videoEl.pause()
				}
			})
		}, options)

		videoRefs.current.forEach((el) => el && observer.observe(el))
		return () => {
			videoRefs.current.forEach((el) => el && observer.unobserve(el))
			observer.disconnect()
		}
	}, [videos])

	useEffect(() => {
		// initialize per-video UI state (default placeholder counts)
		setLiked(Array(videos.length).fill(false))
		setLikesCount(Array(videos.length).fill(23))
		setSaved(Array(videos.length).fill(false))
		setSavesCount(Array(videos.length).fill(23))
		setCommentsCount(Array(videos.length).fill(45))
	}, [videos])

	const toggleLike = (idx) => {
		setLiked((prev) => {
			const copy = [...prev]
			copy[idx] = !copy[idx]
			return copy
		})
		setLikesCount((prev) => {
			const copy = [...prev]
			copy[idx] = (copy[idx] || 0) + (liked[idx] ? -1 : 1)
			return copy
		})
	}

	const toggleSave = (idx) => {
		setSaved((prev) => {
			const copy = [...prev]
			copy[idx] = !copy[idx]
			return copy
		})
		setSavesCount((prev) => {
			const copy = [...prev]
			copy[idx] = (copy[idx] || 0) + (saved[idx] ? -1 : 1)
			return copy
		})
	}

	return (
		<div className="reels-container">
			{videos.length === 0 ? (
				<div style={{ padding: 40, textAlign: 'center', color: '#9fb0c8' }}>
					No videos loaded — check backend or network (open console)
				</div>
			) : (
				videos.map((item, i) => (
					<article
						key={item._id}
						className="reel"
						ref={(el) => (videoRefs.current[i] = el)}
					>
						<video src={item.video} className="reel-video" playsInline muted loop preload="metadata" />

						<div className="video-controls">
							<button className={"vc-btn " + (liked[i] ? 'liked' : '')} onClick={() => toggleLike(i)} aria-label="like">
								<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 21s-7.4-4.35-10-7.1C-0.12 10.58 2.21 6 6 6c2.06 0 3.58 1.2 4 2.02.42-.82 1.94-2.02 4-2.02 3.79 0 6.12 4.58 4 7.9C19.4 16.65 12 21 12 21z" />
								</svg>
								<span className="vc-count">{likesCount[i]}</span>
							</button>

							<button className={"vc-btn " + (saved[i] ? 'saved' : '')} onClick={() => toggleSave(i)} aria-label="save">
								<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M6 2h12a1 1 0 0 1 1 1v18l-7-3-7 3V3a1 1 0 0 1 1-1z" />
								</svg>
								<span className="vc-count">{savesCount[i]}</span>
							</button>

							<button className="vc-btn" onClick={() => window.alert('Open comments')} aria-label="comments">
								<svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M20 2H4a2 2 0 0 0-2 2v14l4-2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
								</svg>
								<span className="vc-count">{commentsCount[i]}</span>
							</button>
						</div>

						<div className="overlay top">
							<div className="meta">
								<div className="desc">{item.description}</div>
								{item.foodPartner ? (
									<Link
										className="visit-btn"
										to={"/food-partner/" + item.foodPartner}
										onClick={() => window.alert(`Visit store: ${item.store}`)}
									>
										Visit store
									</Link>
								) : (
									<button className="visit-btn" disabled style={{opacity:0.6}}>Visit store</button>
								)}
							</div>
						</div>
					</article>
				))
			)}
		</div>
	)
}

export default Home;
