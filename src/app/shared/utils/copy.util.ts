export function copy(msg: string) {
    if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(msg);
    } else {
        const promiseResult = new Promise<boolean>((resolve, reject) => {
            try {
                const textarea = document.createElement('textarea');
                document.body.appendChild(textarea);
                textarea.value = msg;
                textarea.select();
                document.execCommand('Copy', false, undefined);
                document.body.removeChild(textarea);
                resolve(true);
            } catch (err) {
                console.error(err);
                reject();
            }
        });

        return promiseResult;
    }
}
