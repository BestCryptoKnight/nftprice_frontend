function Storage(props) {
	const LocalStorage = ({ type, keys, value, onLocalStorage }) => {
		switch (type) {
			case 'set':
				keys !== undefined && window.localStorage.setItem(keys, value)
				break
			case 'get':
				keys !== undefined && onLocalStorage(window.localStorage.getItem(keys))
				break
			case 'remove':
				keys !== undefined && window.localStorage.removeItem(keys)
				break
			case 'clear':
				keys !== undefined && window.localStorage.clear()
				break
			default:
				alert('localStorage type undefined')
				break
		}
	}

	return <div>{LocalStorage(props)}</div>
}
export default Storage