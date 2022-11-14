urlPrefix = false;

if (window.location.pathname.split('/').slice(1).shift() == 'mumaths') {
    urlPrefix = true;
}

const sleeper = ms => new Promise(r => setTimeout(r, ms));

const rooturl = url => {
    fixed = urlPrefix ? '/mumaths' + url : url;
    return fixed;
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const fetchAndReplace = async (resources) => {
    let html,js
    if (resources[0]) {
        const response = await fetch(rooturl('/static/html/' + resources[0]));
        let html = await response.text();

        document.getElementById('game').classList.add('notactive')
        await sleeper(250)
        document.getElementById('game').innerHTML = html;
        await sleeper(10)
        document.getElementById('game').classList.remove('notactive');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
        }
    }
    if (resources[1]) {
        const scriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            document.body.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
            script.async = true;
            script.src = rooturl('/static/js/' + resources[1]);
            script.classList.add('dynamic')
        });
        //https://stackoverflow.com/questions/44803944/can-i-run-a-js-script-from-another-using-fetch
    }
    if (resources[2]) {
        document.title = resources[2] + ' - MUMATHS — Quick Math Games'
    }
    if (resources[3]) {
        if (document.querySelector(`#mode a.active`)) {
            document.querySelector(`#mode a.active`).classList.remove('active')
        }
        if (document.querySelector(`#mode a[data-menu='${resources[3]}']`)) {
            document.querySelector(`#mode a[data-menu='${resources[3]}']`).classList.add('active')
        }
    }
}

const router = async () => {
    let urlComponenets = window.location.pathname.split('/').slice(1);
    const urlrequest = urlComponenets[0]=='mumaths' ? urlComponenets.slice(1) : urlComponenets;

    if (urlrequest[0] == '') {
        history.replaceState(null,null,rooturl('/calculation'));
        router();
        return;
    }

    const routeList = [
        { path: "notfound", view: ['404.html','404.js','Not Found'] },
        { path: "calculation", view: ['calculation.html','calculation.js','Calculation','calculation'] },
    ];

    const potentialMatches = routeList.map(route => {
        return {
            route: route,
            isMatch: urlrequest[0] == route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if (!match) {
        match = {
            route: routeList[0],
            isMatch: true
        }
    }

    await fetchAndReplace(match.route.view);

}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});