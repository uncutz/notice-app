export default function Store() {
    const localStorage = window.localStorage;

    if (!localStorage) {
        throw new Error('local storage not available')
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    this.setItem = (key, value) => {
        localStorage.setItem(key, value);

        fetch('/api/notices.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: value
        });
    }

    /**
     * @param {string} key
     * @return {string}
     */
    this.getItem = key => {

        fetch('/api/notices.php')
            .then(response => response.json())
            .then(function (response) {
                console.log(response);
            });

        return localStorage.getItem(key);
    }
}