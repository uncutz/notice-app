export default function Store()
{
    const localStorage = window.localStorage;

    if ( !localStorage)
    {
        throw new Error('local storage not available')
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    this.setItem = (key, value) => {
        localStorage.setItem(key, value);
    }

    /**
     * @param {string} key
     * @return {string}
     */
    this.getItem = key => {
        return localStorage.getItem(key);
    }
}