import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DoubleRecordException } from '../exceptions/double-record.exception';
import { Response } from 'express';

@Catch(DoubleRecordException)
export class DoubleRecordFilter implements ExceptionFilter {
  catch(exception: DoubleRecordException<any>, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
