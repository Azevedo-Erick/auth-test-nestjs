import { Prisma } from "@prisma/client";

export class Post implements Prisma.PostUncheckedCreateInput {
    id?: number;
    title: string;
    description: string;
    categories?: Prisma.CategoriesPostUncheckedCreateNestedManyWithoutPostsInput;
    usuarioId?: number;
}
