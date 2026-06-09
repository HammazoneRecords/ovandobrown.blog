import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'authorImage',
            title: 'Author Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (mins)',
            type: 'number',
        }),
        defineField({
            name: 'listeningTime',
            title: 'Listening Time (mins)',
            type: 'number',
        })
    ],
});
