- Because of [quirks with objectionjs](https://github.com/Vincit/objection.js/issues/1302#issuecomment-550974067), and for general purpose architectural reasons, it might make sense to create a repository layer, and also maybe a layer for services and/or controllers.
- swagger
- jest and tdd
- convert database types to model types (true vs 1)


Foreign Key "ON DELETE SET NULL" action not getting triggered

I have a todo table and a category table. The todo table has a `category_id` foreign key that references `id` in the category table, and it was created with the "ON DELETE SET NULL" action.
```sql
create table `category` (`id` integer not null primary key autoincrement, `name` varchar(255) not null);
```
```sql
create table `todo` (`id` integer not null primary key autoincrement, `title` varchar(255) not null, `complete` boolean not null default '0', `category_id` integer, foreign key(`category_id`) references `category`(`id`) on delete SET NULL on update CASCADE)
```
I also have an endpoint in my application that allows users to delete a category.
```js
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Category.delete(id)
  return res.status(204).json()
})
```
This route successfully deletes categories, but the problem is that related todo items are not getting their `category_id` property set to null, so they end up with a category id that no longer exists. Strangely though, if I open up my database GUI and manually execute the query to delete a category... `DELETE FROM category WHERE id=1`... the "ON DELETE SET NULL" hook is successfully firing. Any todo item that had `category_id=1` is now set to null.
