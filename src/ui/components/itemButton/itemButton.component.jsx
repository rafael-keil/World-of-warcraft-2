import "./itemButton.style.css";

export function ItemButton({ item, handleClick }) {
  const disable = item.disable
    ? item.disable.some((boolDisable) => boolDisable)
    : false;

  function handleButton() {
    handleClick(item.id);
  }

  return (
    <button onClick={handleButton} className="itemButton" disabled={disable}>
      <img
        className="itemButton__image"
        src={item.image}
        alt="imagem do item"
      />

      <p>Nome: {item.name}</p>
      <p>Tipo: {item.type}</p>
      <p>Preço: {item.price}</p>
      {item.enhancement ? <p>Modificador: {item.enhancement}</p> : null}

      {item.disable && item.disable[0] ? <p>Sem dinheiro</p> : null}
      {item.disable && item.disable[1] ? <p>Já possui item</p> : null}
      {item.disable && item.disable[2] ? (
        <p>Precisa da expansão {item.expansionId}</p>
      ) : null}
    </button>
  );
}
