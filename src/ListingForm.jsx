import { useState } from 'react'
import { categories } from './data'

const fields = [
  { name: 'price', label: 'Оплата за место', placeholder: '40 000 ₸ / мес' },
  { name: 'title', label: 'Заголовок', placeholder: '2-комнатная квартира · Есиль' },
  { name: 'lives', label: 'Кто живёт сейчас', placeholder: '3 студента, 18–19 лет' },
  { name: 'seeks', label: 'Кого ищете', placeholder: 'студента' },
  { name: 'moveIn', label: 'Когда можно заселиться', placeholder: 'с 1 ноября' },
  { name: 'term', label: 'На какой срок', placeholder: 'от 6 месяцев' },
]

const allAmenities = ['Wi-Fi', 'Телевизор', 'Микроволновая печь','Стиральная машина', 'Холодильник', 'Кондиционер', 'Мебель', 'Кухня']

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: 12,
  marginTop: 4,
  border: '1px solid #d5d9e0',
  borderRadius: 12,
  fontSize: 15,
}

function ListingForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    category: 'students',
    price: '',
    title: '',
    lives: '',
    seeks: '',
    moveIn: '',
    term: '',
    description: '',
    amenities: [],
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleAmenity(name) {
    const has = form.amenities.includes(name)
    setForm({
      ...form,
      amenities: has
        ? form.amenities.filter((a) => a !== name)
        : [...form.amenities, name],
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={onCancel}
        style={{
          padding: '10px 16px',
          borderRadius: 22,
          border: '1px solid #d5d9e0',
          background: 'white',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ← Отмена
      </button>

      <h2>Новое объявление</h2>

      <label style={{ display: 'block', marginBottom: 12 }}>
        Категория
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        >
          {categories
            .filter((c) => c.key !== 'all')
            .map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
        </select>
      </label>

      {fields.map((f) => (
        <label key={f.name} style={{ display: 'block', marginBottom: 12 }}>
          {f.label}
          <input
            name={f.name}
            value={form[f.name]}
            onChange={handleChange}
            placeholder={f.placeholder}
            required
            style={inputStyle}
          />
        </label>
      ))}

      <div style={{ marginBottom: 12 }}>
        Что есть в квартире
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          {allAmenities.map((a) => (
            <label key={a}>
              <input
                type="checkbox"
                checked={form.amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />{' '}
              {a}
            </label>
          ))}
        </div>
      </div>

      <label style={{ display: 'block', marginBottom: 16 }}>
        Описание
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          style={inputStyle}
        />
      </label>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: 14,
          border: 0,
          borderRadius: 12,
          background: '#d63d4a',
          color: 'white',
          fontWeight: 800,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        Опубликовать
      </button>
    </form>
  )
}

export default ListingForm