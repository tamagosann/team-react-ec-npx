import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/styles';
import { storage } from '../../firebase';

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48,
    }
})

const ImageArea = (props) => {
    const classes = useStyles();

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, { type: 'image/jpeg' });

        //16桁の文字列を作る
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                            .map((n) => S[n % S.length]).join('');

        const uploadRef = storage.ref("images").child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                props.setImage(downloadURL)
            });
        })
    },[]);

    return (
        <div>
            { props.image && (
                <div className="p-media__thumb">
                    <img src={props.image} alt="プレビュー画像"/>
                </div>
            )}
            <div>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            style={{display: 'none'}} type="file" id="image"
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
            </div>

        </div>
    )
};

export default ImageArea;