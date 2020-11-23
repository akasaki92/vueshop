<template>
    <div class="home">
        <!-- template categories -->
        <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
            <div class="text-right">
                <v-btn small text to="/categories" class="blue--text">
                    All Categories <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
            <v-layout wrap>
                <v-flex
                    v-for="category in categories"
                    :key="`category-` + category.id"
                    xs6
                >
                    <v-card :to="'/category/' + category.slug">
                        <v-img :src="getImage('/categories/'+category.image)" class="white--text">
                            <v-card-title
                                class="fill-height align-end"
                                v-text="category.name"
                            />
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- template books -->
        <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
            <div class="text-right">
                <v-btn small text to="/books" class="blue--text">
                    All Books <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
            <v-layout wrap>
                <v-flex v-for="book in books" :key="`book-` + book.id" xs6>
                    <v-card :to="'/book/' + book.slug">
                        <v-img :src="getImage('/books/'+book.cover)" class="white--text">
                            <v-card-title
                                class="fill-height align-end"
                                v-text="book.title"
                            ></v-card-title>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import '../plugins/axios'

export default {
    name: "Home",
    data: () => ({
        categories: [],
        books: [],
    }),
    created() {
        console.log("get data categories")
        this.axios.get("/categories/random/2")
            .then((response) => {
                let { data } = response.data
                this.categories = data
                console.log(data)   
            })   
            .catch((error) => {
                let { response } = error
                console.log(response)
            })
            
        this.axios.get("/books/top/4")
            .then((response) => {
                let { data } = response.data
                this.books = data
                console.log(data)
            })
            .catch((error) => {
                let { response } = error
                console.log(response)
            })
    }    
};
</script>
