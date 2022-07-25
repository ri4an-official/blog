class Storage {
	set = (name: string, token: string) => localStorage.setItem(name, token ?? '')

	get = (name: string) => localStorage.getItem(name) ?? ''
}
export default new Storage()
