// import {ViewEntity, ViewColumn} from "typeorm";

// @ViewEntity({ 
//     expression: (connection: Connection) => connection.createQueryBuilder()
//         .select("post.id", "id")
//         .addSelect("post.name", "name")
//         .addSelect("category.name", "categoryName")
//         .from(Post, "post")
//         .leftJoin(Category, "category", "category.id = post.categoryId")
// })
// export class PostCategory {

//     @ViewColumn()
//     id: number;

//     @ViewColumn()
//     name: string;

//     @ViewColumn()
//     categoryName: string;

// }
