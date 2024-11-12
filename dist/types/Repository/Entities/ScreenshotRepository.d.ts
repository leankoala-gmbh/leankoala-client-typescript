import Repository from '../Repository';
declare class ScreenshotRepository extends Repository {
    constructor();
    getScreenshot(system: any): Promise<any>;
    getSystemScreenshots(system: any): Promise<any>;
}
export default ScreenshotRepository;
