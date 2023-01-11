import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = 
    like ? await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit()
    : await client
      .patch(postId)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();

    res.status(200).json(data);
  }
}






































// import type { NextApiRequest, NextApiResponse } from 'next';
// import { v4 as uuid } from 'uuid';

// import { allUsersQuery } from './../../utils/queries';
// import { client } from '../../utils/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if(req.method === 'PUT') {
//     const { userId, postId, like } = req.body;

//     // ...patch --> change something in the client
//     // ....setIfMissing only for the first time ...
//     const data = 
//     like ? await client
//     .patch(postId)
//     .setIfMissing({ likes: [] })
//     .insert('after', 'likes[-1]', [
//         {
//             _key: uuid(),
//             _ref: userId,
//         }
//     ])
//     .commit()
//     : await client
//     .patch(postId)
//     // checking the like that has a reference of userId
//     .unset([`likes[_ref=="${userId}"]`])
//     .commit()
//     .then(() => res.status(200).json("Updated Post")
//     )
   

//   }
// }
