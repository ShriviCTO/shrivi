import { JwtPayload } from 'jsonwebtoken';
import 'multer';

interface CustomJwtPayload extends JwtPayload {
  id: string;
  name: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // Custom payload type
    }
  }
}

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        thumbnail?: string; // Add optional thumbnail property
      }
      interface Request {
        file?: MulterFile; // Update the request's file property
      }
    }
  }
}
