const { Model, TEXT, DATE, ARRAY } = require('sequelize');


class Memory extends Model {};
/* 
I would like a feature called 'Memories' where I can record personal memories related to a movie. 
These memories would include a title, date, photos and a story. For instance, I would like to include the photos I took the day 
I watched 'Mad Max' in theaters, along with the date and the story of what my friends and I did that day.

*/
const { DBConfiguration } = require('../../config');

Memory.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: TEXT,
        allowNull: false
    },
    date: {
        type: DATE,
        allowNull: false
    }, 
    photos: {
        type: ARRAY(TEXT)
    },
    story: {
        type: TEXT,
        allowNull: false
    }
},
{
    sequelize: DBConfiguration.sequelize,
    modelName: 'Memory'
}
)


module.exports = Memory;