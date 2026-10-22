import { openChat } from './telegram'
function ListingDetails({ item, onBack }) {
    function handleContact() {
        if (item.owner_username) openChat(item.owner_username)
        else alert('У автора нет username в Telegram, связаться пока нельзя.')
    }
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          padding: '10px 16px',
          borderRadius: 22,
          border: '1px solid #d5d9e0',
          background: 'white',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ← Назад
      </button>

      <div style={{ background: 'white', borderRadius: 16, padding: 16, marginTop: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{item.price}</div>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8 }}>{item.title}</div>

        <p style={{ marginTop: 16 }}>Живут: {item.lives}</p>
        <p>Ищут: {item.seeks}</p>
        <p>Заселение: {item.moveIn}</p>
        <p>Срок: {item.term}</p>

        <h3>Что есть в квартире</h3>
        <ul>
          {item.amenities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <h3>Описание</h3>
        <p>{item.description}</p>

        <button
          style={{
            width: '100%',
            padding: 14,
            marginTop: 8,
            border: 0,
            borderRadius: 12,
            background: '#d63d4a',
            color: 'white',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
          }}
          onClick={handleContact}
        >
          Написать в Telegram
        </button>
      </div>
    </div>
  )
}

export default ListingDetails