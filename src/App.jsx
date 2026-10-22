import { useState, useEffect } from 'react'
import ListingCard from './ListingCard'
import ListingDetails from './ListingDetails'
import ListingForm from './ListingForm'
import { categories } from './data'
import { fetchListings, createListing } from './api'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchListings()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const visible = items.filter(
    (item) => category === 'all' || item.category === category
  )
  const selected = items.find((item) => item.id === selectedId)

  async function addListing(form) {
    try {
      const created = await createListing(form)
      setItems([created, ...items])
      setShowForm(false)
    } catch (e) {
      alert('Не удалось сохранить: ' + e.message)
    }
  }

  let content

  if (showForm) {
    content = <ListingForm onSave={addListing} onCancel={() => setShowForm(false)} />
  } else if (selected) {
    content = <ListingDetails item={selected} onBack={() => setSelectedId(null)} />
  } else {
    content = (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Roomi</h1>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 16px',
              borderRadius: 22,
              border: 0,
              background: '#d63d4a',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Подать
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              style={{
                padding: '10px 16px',
                borderRadius: 22,
                border: '1px solid #d5d9e0',
                fontWeight: 700,
                cursor: 'pointer',
                background: category === c.key ? '#1b2330' : 'white',
                color: category === c.key ? 'white' : '#1b2330',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading && <p>Загрузка…</p>}
        {error && <p style={{ color: '#a12632' }}>Ошибка: {error}</p>}
        {!loading && !error && <p>Найдено объявлений: {visible.length}</p>}

        {visible.map((item) => (
          <ListingCard
            key={item.id}
            item={item}
            onClick={() => setSelectedId(item.id)}
          />
        ))}
      </>
    )
  }

  return <div style={{ maxWidth: 390, margin: '0 auto', padding: 16 }}>{content}</div>
}

export default App