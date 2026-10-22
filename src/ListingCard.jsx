function ListingCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        cursor: 'pointer',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800 }}>{item.price}</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>{item.title}</div>
      <div style={{ fontSize: 13, marginTop: 8 }}>Живут: {item.lives}</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>Ищуть: {item.seeks}</div>
    </div>
  )
}

export default ListingCard