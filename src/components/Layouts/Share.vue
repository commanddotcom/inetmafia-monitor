<script>

export default {
    name: 'Share',
    methods: {
        copy() {
            let link = document.getElementById('extension-link').value;
            navigator.clipboard.writeText(link).then(function() {
                document.getElementById('copy-link').innerHTML = 'Copied!'
            }, function(e) {
                console.error('Async: Could not copy text: ', e);
            });
        }
    }
}
</script>
<template>
    <div class="share-wrap">
        <input id="extension-link" readonly type="text" value="https://chrome.google.com/webstore/detail/inetmafiaru/lijoemodcnnpnigokbckefpiplcgielk"><a @click="copy" href="#" title="Копировать" class="copy-button">

            <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>
            
            <span id="copy-link">Copy</span>
        </a>
    </div>
</template>