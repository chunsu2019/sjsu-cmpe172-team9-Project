const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
        //use to edit header
        header: Header,
        delimiter: Delimiter,
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
        embed: Embed,
        list: {
            class: List,
            inlineToolbar: true,
        },
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/account/new_story/save_image',
                    byUrl: '/account/new_story/save_image',
                }
            }
        }
        
    }
});

document.getElementById('story_form').addEventListener('submit', () => {
    editor.save().then((outputData) => {
        document.getElementById('storyInput').value = (JSON.stringify(outputData.blocks))   
    })
})
