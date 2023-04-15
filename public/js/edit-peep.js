let body = {}
function changeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    body = { ...body, [name]: value };
    console.log(body)
}

function handleSubmit(e) {
    e.preventDefault();
    console.log(body)
}
document.querySelector('#edit-peep-form').addEventListener('submit', handleSubmit);
