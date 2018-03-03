$(document).ready(() => {
    $('.category-delete').on('click', (e) => {
      $target = $(e.target);
          $.ajax({
              type: 'DELETE',
              url: '/categories/delete/'+$target.attr('data-cat-id'),
              success: (result) => {
                if(result.status == 200){
                    alert('Category Removed');
                  window.location='/manage/categories';
                }
                  
              },
              error: (error) => {
                  console.log(error);
              }
          });
          return false;
    });

    $('.article-delete').on('click', (e) => {
      $target = $(e.target);
          $.ajax({
              type: 'DELETE',
              url: '/articles/delete/'+$target.attr('data-article-id'),
              success: (result) => {
                if(result.status == 200){
                    alert('Article Removed');
                  window.location='/manage/articles';
                }
                  
              },
              error: (error) => {
                  console.log(error);
              }
          });
          return false;
    });

  });
  