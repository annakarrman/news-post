new Vue({
    el: "#newsPosts",
    data() {
        return {
            newsposts: []
        }
    },

    mounted() {
        axios.get("localhost:1234/api/newsposts")
        .then(response => (this.newsposts = response.data))
    },
    methods: {
        // delete newspost
        deleteNewsPost(_id, i) {
            axios.delete("localhost:1234/api/newsposts/delete" + _id)
            .then(() => {
                this.newsposts.splice(i, 1)
            });
            console.log(this.newsposts);
        }
    }
})








/*// skriver ut listan med kurser när fönstret laddas
window.onload = loadCourses();



// Läs in kurser med AJAX
function loadCourses() {
    $.getJSON("http://localhost:1234/api/newsposts", function(data) {

    // Rensa listan och få inläst på nytt
    $("#newsPosts").html("");
    
    for(var i = 0; i<data.length; i++) {
            // lägger in datan i tabellen
            $("#newsPosts").append("<section class = 'newsPost'><h2>" + data[i].title + "</h2><p class = 'created'>" + 
            data[i].createdAt + "</p><br /><p class = 'newsText'>" + data[i].text + "</p></section>");
        }
    });
}
*/