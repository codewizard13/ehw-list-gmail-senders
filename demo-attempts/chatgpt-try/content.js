var senders = {};

var elements = document.getElementsByClassName("yW");
for (var i = 0; i < elements.length; i++) {
    var sender = elements[i].innerText;
    if (senders[sender]) {
        senders[sender]++;
    } else {
        senders[sender] = 1;
    }
}

console.log(senders);