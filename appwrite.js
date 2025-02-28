import { Client, Database,ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
.setEndpoint('http://cloud.appwrite.io/v1')
.setProject(PROJECT_ID)

const database = new Database(client);
export const updateSearchCount = async (searchTerm, movie) => {

    try {
        const result = await database.listDocumenta(DATABASE_ID, COLLECTION_ID, [

            Query.equals('searchTerm', searchTerm),
        ])

        if(result.documents.length>0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(),{

                searchTerm,
                count: 1,
                movies_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })

        }
    }
    catch (error) {
        console.error(`Error updating search count: ${error}`);
    }

}