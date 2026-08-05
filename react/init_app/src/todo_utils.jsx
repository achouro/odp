
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <div>
          {name + ' ✅'}
        </div>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h2>Sally Ride's Packing List</h2>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}

