export default function Store() {
    const localStorage = window.localStorage;

    if (!localStorage) {
        throw new Error('local storage not available')
    }

    //Speichern der Daten lokal und senden an den Server mittels fetch()

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
        }).then(function (response) {
            if (response.status === 200) {
                return response;
            }

            throw new Error('could not store notices');
        }).catch(function (error) {
            console.error(error);
        });
    }

    //Rückgabe der Daten an die Application, also laden der Daten

    /**
     * @param {string} key
     * @return {string}
     */
    this.getItem = async key => {

        await fetch('/api/notices.php')
            .then(function (response) {
                if (response.status === 200) {
                    return response;
                }

                throw new Error('could not fetch notices');
            })
            .then(response => response.text())
            .then(function (notices) {
                localStorage.setItem(key, notices);
            }).catch(function (error) {
                console.error(error);
            });

        return localStorage.getItem(key);
    }
}