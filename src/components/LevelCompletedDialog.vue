<template>
    <dialog class="mdl-dialog">
        <h4 class="mdl-dialog__title">Level completed!</h4>
        <div class="mdl-dialog__content">
            <p>
                <!-- rating? -->
            </p>
        </div>
        <div class="mdl-dialog__actions ">
            <button type="button" class="mdl-button">Next level</button>
            <button type="button" class="mdl-button close">Menu</button>
        </div>
    </dialog>
</template>

<!--suppress JSUnresolvedVariable, JSUnresolvedFunction -->
<script>
    export default {
        name: 'LevelCompletedDialog',
        mounted: function () {
            let dialog = document.querySelector('dialog');
            // eslint-disable-next-line no-undef
            dialogPolyfill.registerDialog(dialog);
            dialog.showModal();

            document.querySelector('dialog').querySelector('.close').addEventListener('click', function() {
                dialog.close();
            });
        }
    }
</script>

<style scoped>

</style>