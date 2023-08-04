import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public bgVideo$!: Observable<SafeResourceUrl>;

    constructor(
        private myDomSanitizer: DomSanitizer,
    ) { }
    public async ngOnInit(): Promise<void> {
        this.bgVideo$ = of('./assets/getreide.mp4').pipe(
            switchMap(async (url: string) => {
                const v: Blob = await fetch(url).then((val: Response) => val.blob());
                return this.myDomSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(v));
            }),
        );
    }
    public videoLoaded(): void {
        const video: HTMLVideoElement = document.getElementById('background-video') as HTMLVideoElement;
        video.muted = true;
        video.oncanplaythrough = () => {
            video.play();
            console.log('playing')
        };
        if (video.readyState > 3) {
            video.play();
            console.log('playing')
        }
        // try force play
        setTimeout(() => video.play(), 5000)
        

    }
}
